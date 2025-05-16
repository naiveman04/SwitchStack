# SwitchStack - Role Transition Platform

## Overview

**SwitchStack** is a web-based platform designed to empower tech professionals in Pune to switch roles by providing personalized learning roadmaps. The project leverages **Supabase** for user authentication and data storage, and **Gemini API** to generate role-specific roadmaps, helping users align their skills with company tech stacks efficiently.

## Features

- ✍️ **Skill Input & Analysis**: Allows users to input their skills and receive tailored role recommendations.
- 🧠 **AI-Generated Roadmaps**: Integrates **Gemini API** to create learning roadmaps for roles like Frontend Engineer and Backend Engineer.
- 📊 **Interactive Roadmap Display**: Features expandable cards to view AI-driven roadmaps for various tech roles.
- 🌐 **Responsive Web Interface**: A user-friendly front-end built with **HTML, CSS, JavaScript, and React** for seamless interaction.

## Pages

The **SwitchStack** web application consists of four main pages:

1. **Landing Page** – A welcoming interface with a fading hero text effect to encourage exploration.
2. **Profile Page** – Allows users to input skills and view their personalized data.
3. **Roadmap Page** – Displays role-specific roadmaps (e.g., Frontend, Backend) in expandable cards.
4. **Cards Page** – Showcases tech roles in Pune with relevant details and links to roadmaps.

## Technologies Used

- **Languages**: JavaScript, HTML, CSS
- **Backend & Database**: Supabase (for authentication and real-time data storage)
- **AI Integration**: Gemini API
- **Web Development**: React, Node.js

## How It Works

1. **User Signup/Login**: Users authenticate via **Supabase** to access personalized features.
2. **Skill Input**: On the Profile Page, users enter their skills (e.g., JavaScript, React) and experience.
3. **Role Exploration**: The Cards Page displays tech roles in Pune, linking to the Roadmap Page.
4. **Roadmap Generation**: **Gemini API** generates learning roadmaps for selected roles, displayed in expandable cards.
5. **Interactive Experience**: The UI features a scroll-based fading effect on the Landing Page and responsive design across all pages.

## Installation & Setup

### Prerequisites

- Node.js
- npm (Node package manager)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/switchstack.git  
   cd switchstack  
   ```

2. Install dependencies:

   ```bash
   npm install  
   ```

3. Run the application:

   ```bash
   npm start  
   ```

## Future Enhancements

- 🏢 **Company-Specific Tech Stacks:** Integrate real-time job data to align roadmaps with specific companies in Pune.
- 📱 **Mobile App Development:** Create a dedicated mobile app for on-the-go access.
- 🔍 **Advanced Skill Matching:** Improve role recommendations with more detailed skill analysis.
- 🎨 **UI Customization:** Add theme options for users to personalize their experience.
