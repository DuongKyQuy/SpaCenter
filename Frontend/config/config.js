const token = localStorage.getItem("authToken");

const API_log_out = "https://precious-buzzard-brave.ngrok-free.app/api/auth/logout" 
const API_log_in = "https://precious-buzzard-brave.ngrok-free.app/api/auth/login"
const API_sign_up = "https://precious-buzzard-brave.ngrok-free.app/api/auth/regis"
// Component AllService
const API_GET_CATEGORY = "https://precious-buzzard-brave.ngrok-free.app/api/categories"
// Account Page
const API_GET_APOINTMENT_BY_TOKEN = "https://precious-buzzard-brave.ngrok-free.app/api/self/appointment"
// Booking Page
const API_GET_APPOINTMENT_TIME_BY_TECHNICIAN = "https://precious-buzzard-brave.ngrok-free.app/api/appointments/disable-time?"
const API_POST_APPOINTMENT = "https://precious-buzzard-brave.ngrok-free.app/api/appointments"
