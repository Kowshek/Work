import React from "react";
import "./Home.css";
import Video from "./video";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const handleGoback = () => {
    navigate(-1);
  };

  const [item, setItems] = useState(null);
  const [dataIsloaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
      axios.get("https://api.restful-api.dev/objects/7").then((res) => {
      console.log(res.data);
      setItems(res.data);
      setDataIsLoaded(true);
    });
  }, []);
    // useEffect()
  if (!dataIsloaded) {
    return (
      <div class="spinner">
        <h1>Please wait some time...</h1>
      </div>
    );
  }

  return (

    <div className="dashboard-container">
      <h1 class="welcome-text">Welcome to Linkedln</h1>
      <div className="content-section">
        <div className="sidebar">
          <div className="profile-card">
            <div className="profile-picture"></div>
            <h3>User Name</h3>
            <p>User Bio</p>
            <div className="profile-links">
              <p>
                <a href="#">Who viewed your profile</a>
              </p>
              <p>
                <a href="#">Connections</a>
              </p>
              <p>
                <a href="#">Manage your network</a>
              </p>
              <p>
                <a href="#">Access exclusive tools</a>
              </p>
              <Link
                onClick={handleGoback}
                style={{ textDecoration: "underline" }}
                >Sign up
              </Link>
            </div>
          </div>
          <div className="recent-section">
            <h4>Recent</h4>
            <ul>
              <li>
                <a href="#">Groups</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Followed Hashtags</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-content">
          <div className="post-box">
            <button>Start a post</button>
            <button class="article-button">Write an article</button>
          </div>
          <div className="feed-post">
            <div className="feed-header">
              <div className="feed-avatar"></div>
              <div className="feed-user-info">
                <h4>User Name</h4>
                <p>8h • Edited/None • Globe Icon</p>
              </div>
            </div>
            <p className="feed-text">
              {/* Lorem ipsum odor amet, consectetuer adipiscing elit. Ligula
              imperdiet diam suscipit ad dui praesent mauris. Nisi mi vehicula
              sagittis, volutpat suscipit lectus. Viverra tempus id urna laoreet
              porta. Maecenas leo litora in malesuada aptent curae senectus
              habitant ac. Ultricies quam fames justo fames vitae felis leo.
              Blandit tristique iaculis maximus arcu ad venenatis. Congue
              feugiat taciti primis; pharetra id integer mi dis. Ac vitae
              sociosqu sed dis purus lobortis quisque suspendisse. Justo sem mi
              ex taciti posuere. Dignissim justo risus varius habitasse auctor
              at leo. Erat et donec vel venenatis nam nunc tristique accumsan.
              Duis leo mattis elementum justo mattis auctor euismod. Interdum
              lobortis duis ex etiam facilisi conubia integer sed. Proin sem
              nibh fringilla vitae risus laoreet porttitor aptent. Litora ipsum
              varius laoreet nam magnis. Molestie nisi mus finibus ex enim
              primis. Pulvinar platea ad curae commodo magnis posuere habitasse
              conubia. Ultrices pellentesque nunc ante nibh ullamcorper. Proin
              purus sapien ac egestas pellentesque leo. Velit integer penatibus
              torquent felis sed. Sagittis pellentesque phasellus vivamus dui
              dapibus faucibus. Dictum ex habitasse vehicula facilisi potenti. */}

              <div class="api">
                <h1 class="geeks">Data</h1>
                <h3>Fetching data from API</h3>
                {/* <button onClick={api1}>Get data</button> */}
                <div class="container">
                  <div class="item">
                    <ul>
                      <div>
                        <strong>Name : </strong>
                        {item.name}
                      </div>
                      <strong>Id : </strong>
                      {item.id}
                      <div>
                        <strong>Year : </strong>
                        {item.data.year}
                      </div>
                      <div>
                        <strong>Price : </strong> 
                        ${item.data.price.toFixed(2)}
                      </div>
                      <div>
                        <strong>CPU Model : </strong>
                        {item.data["CPU model"]}
                      </div>
                      <div>
                        <strong>Hard Disk Size : </strong>
                        {item.data["Hard disk size"]}
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>

        <div className="news-sidebar">
          <h4>Today's news and views</h4>
          <ul>
            <li>
              <a href="#">News Headline 1</a> - 1,706 readers
            </li>
            <li>
              <a href="#">News Headline 2</a> - 11,255 readers
            </li>
            <li>
              <a href="#">News Headline 3</a> - 4,666 readers
            </li>
            <li>
              <a href="#">News Headline 4</a> - 1,714 readers
            </li>
            <li>
              <a href="#">News Headline 5</a> - 1,727 readers
            </li>
          </ul>
        </div>
      </div>
              
        
      <div className="video-container">
        {/* <Video /> */}
      </div>
    </div>
  );
};

export default Home;
