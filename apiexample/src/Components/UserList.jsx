import React from "react";
import UserCard from "./UserCard";
import UserInfo from "./UserInfo";
import "../Style/UserList.css";

function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <>
        <UserCard key={user.id} user={user} />
        {/* <UserList key={user.id} user={user} /> */}
        </>
      ))}
    </div>
  );
}

export default UserList;
