FROM python:3.9-slim-bullseye

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install -r /app/requirements.txt

# Install Gunicorn
RUN pip install gunicorn psycopg2-binary

# Copy the Django project and applications
COPY srcs/ /app/srcs

# Expose the port for Gunicorn
EXPOSE 8000

ENV PYTHONPATH="/app/srcs:$PYTHONPATH"

# Command to run Gunicorn, adjust the path to match the working directory
CMD ["gunicorn", "-c", "srcs/gunicorn/gunicorn_config.py"]