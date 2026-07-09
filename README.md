# MindCare Wellness 🧠💙

**A Digital Mental Wellness Companion**

MindCare Wellness is a web-based mental health and self-care platform designed to help users monitor and improve their emotional well-being. It provides an accessible, private, and supportive digital space to track mental state, build healthy habits, and access guided tools for stress and anxiety management.

---

## ✨ Features

- **Mood & Anxiety Tracking** – Log daily mood and anxiety levels to visualize emotional patterns over time.
- **Sleep Tracker** – Monitor sleep habits to identify their impact on mental health.
- **Guided Breathing Exercises** – Interactive breathing sessions to reduce stress in the moment.
- **AI-Powered Chat Support** – A conversational assistant offering supportive, on-demand guidance.
- **Gratitude Journal** – A dedicated space to record daily moments of gratitude and encourage a positive mindset.

## 🎯 Objective

The goal of MindCare Wellness is to make mental health support more approachable and consistent by combining self-monitoring tools with gentle, guided interventions — encouraging users to build sustainable habits for long-term emotional well-being.

## 👥 Target Users

Students, working professionals, and individuals looking for a private, low-barrier way to check in on their mental well-being every day — without the cost or scheduling friction of traditional therapy.

## 🛠️ Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React.js   |
| Backend   | Node.js    |
| Database  | MongoDB    |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local instance or Atlas connection string)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mindcare-wellness.git
cd mindcare-wellness

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory with:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

### Running the App

```bash
# Start the backend
cd server
npm start

# Start the frontend (in a new terminal)
cd client
npm start
```

The app will be available at `http://localhost:3000`.

## 📂 Project Structure

```
mindcare-wellness/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── server/          # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
└── README.md
```

## 🔮 Future Enhancements

- Personalized insights and recommendations based on tracked mood, sleep, and anxiety trends.
- Integration with wearable devices for automatic sleep and activity tracking.
- Moderated, anonymous community support groups for peer discussion.
- Push notifications and reminders to encourage consistent journaling and check-ins.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.
