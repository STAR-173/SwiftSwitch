# API Gateway System

## Overview  
This project is a robust **API Gateway System** that dynamically manages multiple API endpoints, prioritizes them, handles failures gracefully, and formats responses based on user-defined criteria. It provides both a backend to manage API interactions and a frontend interface for configuration, monitoring, and visualization.

---

## Features

### **Core API Gateway Functionality**
1. **YAML Configuration**  
   - Parse or auto-generate YAML files to:
     - Define API endpoints with their URLs and priority levels.
     - Map fields from API responses to a user-defined output structure.

2. **Request Handling**  
   - Query API endpoints sequentially based on priority until a successful response is received or all endpoints are exhausted.
   - Log errors and fallback attempts for failed API calls.

3. **Response Formatting**  
   - Use a JSON template file to define the desired output format.
   - Dynamically map fields from API responses to placeholders in the JSON output structure based on YAML mappings.

### **Enhanced Frontend Features**
1. **Manual Input Interface**  
   - Input API details and field mappings through a user-friendly form.
   - Generate YAML configuration files and JSON templates based on inputs.
   - Edit and visualize existing mappings.

2. **File Upload Support**  
   - Validate uploaded YAML and JSON files for correctness.
   - Highlight and allow correction of errors in uploaded configurations.

3. **Monitoring Dashboard**  
   - Display real-time status of API health and availability.
   - Log recent requests, responses, and fallback attempts.

### **Backend Features**
1. **YAML and JSON Parsing**  
   - Parse and validate configuration files using tools like `yaml` and `json`.

2. **Dynamic Field Mapping**  
   - Extract and map fields from API responses dynamically based on user-defined mappings.

3. **API Querying**  
   - Query endpoints sequentially with automatic fallback on failure.
   - Gracefully handle errors and log retries and responses.

---

## Installation

### Prerequisites
- **Node.js**: Install the latest version from [nodejs.org](https://nodejs.org).
- **npm**: Comes with Node.js for managing dependencies.

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/api-gateway-system.git
   cd api-gateway-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the application at `http://localhost:3000`.

---

## Usage

1. **Configure API Endpoints**  
   Use the frontend interface or upload a YAML file with the API endpoint configurations and mappings.

2. **Define Response Format**  
   Upload or create a JSON template specifying the desired output structure.

3. **Monitor and Debug**  
   - Use the dashboard to monitor API health and request logs.
   - Review fallback attempts and response formatting.

---

## Example YAML Configuration

```yaml
api_endpoints:
  - url: "https://api1.example.com/data"
    priority: 1
    field_mappings:
      message: "data.result"
  - url: "https://api2.example.com/data"
    priority: 2
    field_mappings:
      message: "response.message"
```

## Example JSON Template

```json
{
  "status": "success",
  "data": {
    "message": "{message_content}",
    "timestamp": "{current_time}"
  }
}
```

## License  
This project is licensed under the [MIT License](LICENSE).  