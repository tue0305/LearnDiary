import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  // contexts
  const { showAddPostModal, setShowAddPostModal, addPost } = useContext(PostContext);

  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO_LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostFrom = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

    const onSubmit = async event => {
        event.preventDefault()
        
        const { success, message } = await addPost(newPost)
        resetAddPostData()
        
  }

    const resetAddPostData = () => {
        setNewPost({
            title: "",
            description: "",
            url: "",
            status: "TO LEARN",
        })
        setShowAddPostModal(false)
    }
  

  return (
    <Modal show={showAddPostModal} onHide={resetAddPostData}>
      <Modal.Header closeButton>
        <Modal.Title> What do you want to learn?</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit} >
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostFrom}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              name="description"
              value={description}
              onChange={onChangeNewPostFrom}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube tutorial URL"
              name="url"
              value={url}
              onChange={onChangeNewPostFrom}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={resetAddPostData}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learn!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
