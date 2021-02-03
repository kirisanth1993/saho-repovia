import './SingleUserStyle.scss';

export default function SingleUser(props){
    return(
        <div className="single-user-inner-content">
            <div className="text-center">
                <img className="user-avatar" src={ props.imageUrl }></img>
                <h3>{ props.name }</h3>
            </div>
        </div>
    );
}