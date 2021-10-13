import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";

import { useContext, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from "../components/posts/SinglePost";

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
            <Button variant="primary">Learn Now!</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map(post => (
            <Col key={post._id} className="my-2">
              <SinglePost    post={post} />
            </Col>
          ))}
        </Row>
      </>
    );
  }

    return (
        <>
            {body}
        </>
    )
};

export default Dashboard;
