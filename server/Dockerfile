FROM python:3.12.0-slim-bookworm

ENV PYTHONBUFFERED=1
ENV PYTHONWRITEBYTECODE=1
ENV APP=/app

# Change to the app directory
WORKDIR $APP

# Copy and install dependencies
COPY requirements.txt $APP
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

# Copy everything else
COPY . $APP

# Open up the port Django will run on
EXPOSE 8000

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/bin/bash", "/app/entrypoint.sh"]

# Default command (run the Django app with gunicorn)
CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "djangoproj.wsgi"]
