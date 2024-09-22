FROM python:3.9-slim-bullseye

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r /app/requirements.txt

# Install Gunicorn and PostgreSQL binary support
RUN pip install gunicorn psycopg2-binary

# Copy the Django project and applications
COPY backend/ /app/backend

# Expose the port for Gunicorn
EXPOSE 8000

# Set the PYTHONPATH environment variable
ENV PYTHONPATH="/app/backend:$PYTHONPATH"

# Command to run Gunicorn with the provided configuration
CMD ["gunicorn", "-c", "backend/gunicorn/gunicorn_config.py"]