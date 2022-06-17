export default function IsLoggedIn(){
  const token = localStorage.getItem('token');

  if(!token){
    alert('User not logged in')
    window.location.replace('http://localhost:3000/')
  }
}