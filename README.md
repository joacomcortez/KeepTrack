# Keep Track 
## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your local development environment:

- **Node.js:** [Download and install Node.js](https://nodejs.org/), which includes npm, the Node.js package manager.
- **Ruby:** [Download and install Ruby](https://www.ruby-lang.org/en/downloads/), which is required for Ruby on Rails development.
- **Ruby on Rails:** [Install Ruby on Rails](https://guides.rubyonrails.org/getting_started.html#installing-rails), a web application framework for server-side development.

### Getting Started

To set up and run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/joacomcortez/KeepTrack.git

2. **Frontend Setup:**

   ```bash
   cd KeepTrack/frontend
   npm install

3. **Backend Setup:**
   ```bash
   cd KeepTrack/backend
   bundle install

4. **Database Setup**
   ```bash
   cd your-project/backend
   rails db:create
   rails db:migrate

5. **Start Development Servers**
- **Frontend**
   ```bash
   cd Keeptrack/frontend
   npm start
   
- **Backend**
   ```bash
   cd KeepTrack/backend
   rails s
