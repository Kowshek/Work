import React from "react";

function UserInfo({ user }) {
  return (
    <div className="UserInfo_container">
      <h2>{user.name}</h2>
      <p>ID : {user.id}</p>
      <p>Username : {user.username}</p>
      <p>Email : {user.email}</p>
      <p>
        Address : <br></br>
        {user.address.street}
      </p>
      <p>{user.address.suite}</p>
      <p>{user.address.city}</p>
      <p>{user.address.zipcode}</p>
      <p>
        Geo : <br></br>
        {user.geo.lat}
      </p>
      <p>{user.geo.lng}</p>
      <p>Phone : {user.phone}</p>
      <p>
        Website :{" "}
        <a
          href={`http://${user.website}`}
          target="_blank"
          rel="noopner noreferrer"
        >
          {user.website}
        </a>
      </p>
      <p>
        Company : <br></br>
        {user.company.name}
      </p>
      <p>{user.company.catchPharse}</p>
      <p>{user.company.bs}</p>
    </div>
  );
}

export default UserInfo;
