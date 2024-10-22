import React, { useEffect } from 'react';
import './LogInPage.css';
import axios from 'axios';

const LogInPage = () => {

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const RESPONSE_TYPE = "token";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const scope = "playlist-read-private playlist-read-collaborative user-read-private user-read-email user-top-read user-read-playback-state user-modify-playback-state";

    const handleGoogleSignUp = () => {
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`;
    }

    const getToken = async () => {
        const tokenUrl = "https://accounts.spotify.com/api/token";
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        };
        const body = new URLSearchParams({
          grant_type: "client_credentials",
        });
    
        try {
          const response = await axios.post(tokenUrl, body.toString(), { headers });
    
          return response.data.access_token;
        } catch (error) {
          console.error("Error getting token:", error);
        }
      };
    
      useEffect(() => {
        const fetchToken = async () => {
          const token = await getToken();
          console.log("NitinConsole", token);
        };
    
        fetchToken();
      });

  return (
    <>
        <section className='spotify-login-section' style={{width: `${window.innerWidth}px`, height: `${window.innerHeight}px`}}>
            <article className='spotify-login-container'>
                <div className='spotify-login-container-title'>
                    <img className='spotify-login-container-img' src={`${process.env.PUBLIC_URL}/assets/spotify_light.png`} alt='spotify' />
                    <span className='spotify-login-container-tag'>Log in to Spotify</span>
                </div>
                <div className='spotify-login-container-google' onClick={() => handleGoogleSignUp()}>
                    <img className='spotify-login-container-google-img' src={`${process.env.PUBLIC_URL}/assets/google.png`} alt='google' />
                    <span className='spotify-login-container-google-tag'>Sign up with Google</span>
                </div>
                <div className='spotify-thin-line-divider'></div>
                <div className='spotify-login-container-login'>
                    <span className='spotify-login-container-login-label'>Email OR Username</span>
                    <div className='spotify-login-container-login-input'>
                        <input type='text' placeholder='Email or Username'/>
                    </div>
                    <br />
                    <span className='spotify-login-container-login-label'>Password</span>
                    <div className='spotify-login-container-login-input'>
                        <input type='password' placeholder='Password'/>
                    </div>
                    <br />
                    <div className='spotify-login-container-login-btn'>Log In</div>
                </div>
                <div className='spotify-login-container-signup'>
                    <span>Don't have an account? <u>Sign up for Spotify</u></span>
                </div>
            </article>
        </section>
    </>
  )
}

export default LogInPage