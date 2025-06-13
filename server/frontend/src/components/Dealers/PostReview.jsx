import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState(""); // Controlled select needs initial empty string
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  const { id } = useParams();

  // Construct base URL up to "postreview"
  const curr_url = window.location.href;
  const root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  const dealer_url = `${root_url}djangoapp/dealer/${id}`;
  const review_url = `${root_url}djangoapp/add_review`;
  const carmodels_url = `${root_url}djangoapp/get_cars`;

  // Post the review to backend
  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }

    // Validate mandatory fields
    if (!model || review.trim() === "" || date === "" || year === "") {
      alert("All details are mandatory");
      return;
    }

    // Split model properly for multi-word car models
    const [make_chosen, ...model_parts] = model.split(" ");
    const model_chosen = model_parts.join(" ");

    // Build JSON payload matching your review JSON structure
    const jsoninput = JSON.stringify({
      name: name,
      dealership: Number(id),
      review: review.trim(),
      purchase: true,
      purchase_date: date,
      car_make: make_chosen,
      car_model: model_chosen,
      car_year: Number(year),
    });

    console.log("Submitting review JSON:", jsoninput);

    try {
      const res = await fetch(review_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsoninput,
      });
      const json = await res.json();

      if (json.status === 200) {
        // Redirect to dealer page after successful review post
        window.location.href = window.location.origin + "/dealer/" + id;
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      alert("There was an error submitting your review.");
    }
  };

  // Fetch dealer details
  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url);
      const retobj = await res.json();
      if (retobj.status === 200 && retobj.dealer) {
        const dealerobjs = Array.isArray(retobj.dealer) ? retobj.dealer : [retobj.dealer];
        if (dealerobjs.length > 0) setDealer(dealerobjs[0]);
      }
    } catch (error) {
      console.error("Error fetching dealer:", error);
    }
  };

  // Fetch car models list
  const get_cars = async () => {
    try {
      const res = await fetch(carmodels_url);
      const retobj = await res.json();
      if (retobj.CarModels && Array.isArray(retobj.CarModels)) {
        setCarmodels(retobj.CarModels);
      }
    } catch (error) {
      console.error("Error fetching car models:", error);
    }
  };

  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>

        <textarea
          id="review"
          cols="50"
          rows="7"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="input_field">
          Purchase Date{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="input_field">
          Car Make & Model{" "}
          <select
            name="cars"
            id="cars"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="" disabled hidden>
              Choose Car Make and Model
            </option>
            {carmodels.map((carmodel, idx) => (
              <option
                key={idx}
                value={`${carmodel.CarMake} ${carmodel.CarModel}`}
              >
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>
        </div>

        <div className="input_field">
          Car Year{" "}
          <input
            type="number"
            value={year}
            min="2015"
            max="2023"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div>
          <button className="postreview" onClick={postreview}>
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
