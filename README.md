## 🚀 Come Al Paso: Restaurant Recommendation System

Come Al Paso is a restaurant recommendation system designed to enhance tourists’ dining experiences by integrating their **personal preferences and real-time location**. Using a **hybrid recommendation approach**, the system combines **collaborative filtering and content-based techniques** to suggest the most suitable restaurants.

The application was developed using Angular 16, Node.js, Express, Firebase, Google API, and IBM Watson's Natural Language Understanding. Its key features include:

- **Intuitive Navigation Interface** – Allows users to explore features and specify preferences such as restaurant ratings, price range, and cuisine type.
- **Personalized Recommendations** – Provides a curated list of top-rated restaurants based on **Google reviews and sentiment analysis** of visitor feedback. The system ensures that recommendations match the tourist’s saved preferences, considering only open restaurants within a defined search radius.
- **Detailed Restaurant Information** – Displays essential details such as **operating hours, contact information, website, specialties, price range, services, and location**.
- **User Authentication** – Supports **social media login** through Facebook and Gmail.
- **Adjustable Search Radius** – Allows users to modify the search radius based on their current location.
- **Navigation Routes** – Provides **walking and driving directions** from the user’s location to the selected restaurant.

## 📷 Screenshots
Application with restaurant recommendations and navigation routes
![routes and recomendations](/images/routes.png)
Application with advanced filtering options
![](/images/filter.png)
Detailed restaurant information
![](/images/information.png)

## 🖥 Installation and Setup Instructions
### Prerequisites

Before setting up the application, ensure you have the following:

- A **code editor** installed.
- A **Firebase account** with **Authentication** and **Firestore Database** enabled.
- A **Google Cloud API Key** with the new **Places API, Details API** and **Routes API** enabled.
- An **IBM Natural Language Understanding API Key**.

### Installation

Clone the repository and open the project in your preferred code editor.

Install the necessary dependencies:

```bash
npm install

```

### Configuration

#### Server-Side Setup

1. **Create Configuration Files:**
    
    In the **server** folder, create two files:
    
    - `firebase.json`
    - `.env`
2. **Configure Firebase Credentials:**
    
    In `firebase.json`, add your Firebase API credentials:
    
    ```json
    {
      "type": "",
      "project_id": "",
      "private_key_id": "",
      "private_key": "",
      "client_email": "",
      "client_id": "",
      "auth_uri": "",
      "token_uri": "",
      "auth_provider_x509_cert_url": "",
      "client_x509_cert_url": "",
      "universe_domain": ""
    }
    
    ```
    
3. **Set Up Environment Variables:**
    
    In the `.env` file, add the API keys provided by Firebase, Google Cloud, and IBM:
    
    ```
    GOOGLE_APPLICATION_CREDENTIALS= PATH_TO_FIREBASE_JSON_FILE
    GOOGLE_API_KEY= YOUR_GOOGLE_API_KEY
    IBM_API_KEY= YOUR_IBM_API_KEY
    
    ```
    

#### Client-Side Setup

1. **Configure API Keys and Backend URL:**
    
    In the environment file, add your **Google Cloud API Key** and **Firebase configuration**:
    
    ```tsx
    export const environment = {
      production: false,
      GOOGLE_API: '',
      BASE_URL: 'http://localhost:3000', // Update if necessary to match your server configuration
      FIREBASE: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      }
    };
    
    ```
    

### Running the Application

Start the backend server:

```bash
npm start
```

Start the frontend server:

```bash
cd client
ng serve
```

Once the servers are running, access the application at:

```
http://localhost:4200
```

## 🖋 Reflection

The primary goal of this restaurant recommendation system was to provide a **personalized dining experience** tailored to the tourist’s preferences. The application offers an **intuitive interface**, allowing users to specify their dining criteria, access detailed restaurant information, explore routes, and receive dynamic recommendations.

One of the main challenges was choosing the right recommendation technique. Each approach had limitations, such as cold start issues or item sparsity. To address this, a hybrid algorithm was developed.

The algorithm starts by retrieving the **user's location and search radius** to identify the top-rated open restaurants on Google. It then ranks these restaurants based on their overall rating, which is determined by analyzing customer reviews through **sentiment analysis**. If the tourist has preferences, the system filters the restaurants accordingly, prioritizing the three most relevant preferences. Finally, the refined list of recommended restaurants is presented. If no preferences are specified, the system returns the ranked list as is.

The development followed the **Scrum framework**, allowing for **efficient project management and adaptability** to tourist needs. Each sprint lasted **two weeks**, with incremental product releases based on **prioritized requirements**. Continuous **user feedback and testing** were conducted at the end of each sprint to enhance the application's functionality.

From a technological standpoint, the system architecture was built using **Angular and Express**, while the **IBM Watson API** powered the **sentiment analysis module**, significantly enhancing the accuracy of recommendations. Additionally, the **Google API** was integrated to deliver **real-time restaurant data**, ensuring up-to-date availability and precision. At the conclusion of the development process, a **usability test** was conducted with **20 participants**, yielding a **usability score of 81**, which indicates a **satisfactory user experience**. Furthermore, the insights gathered will guide future improvements and refinements to the application.