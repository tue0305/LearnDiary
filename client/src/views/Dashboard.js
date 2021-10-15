import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";

import { useContext, useEffect } from "react";
import { Spinner, Button, Card, Row, Col, Toast } from "react-bootstrap";
import addIcon from "../assets/plus-circle-fill.svg";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  // contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Start: Get all posts
  useEffect(() => getPosts(), []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Learn Diary</Card.Title>
            <Card.Text>
              Click the button below to track your first skill.
            </Card.Text>
            <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)} >Learn Now!</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* Open Add post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new course! </Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* After post is added, show toast. */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white `}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        dalay={3000}
        autohide
      >
        <Toast.Body>
          <strong> {message} </strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
