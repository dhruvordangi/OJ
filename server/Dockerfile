# Use Node.js 20 Alpine for smaller image size
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Install system build tools required to compile/run user submissions
RUN apt-get update \
	 && apt-get install -y --no-install-recommends \
		 build-essential \
		 python3 \
		 python-is-python3 \
		 default-jdk \
	 && rm -rf /var/lib/apt/lists/*

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p /app/uploads

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]
