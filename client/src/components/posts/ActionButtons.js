import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'

const ActionButtons = ({url, _id}) => {
    return (
        <>
            <Button className="post-button" href={url} target='_blank'>
                <img src={playIcon} alt="play icon" width="32" height="32"/>
            </Button>
            
            <Button className="post-button" >
                <img src={editIcon} alt="edit icon" width="24" height="24"/>
            </Button>   

            <Button className="post-button">
                <img src={deleteIcon} alt="delete icon" width="24" height="24"/>
            </Button>   

        </>
    )
}

export default ActionButtons
