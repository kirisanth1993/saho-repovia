export default function Input(props){
    return(
        <input
            id = { props.inputid }
            name = { props.inputname }
            placeholder = { props.inputplaceholder }
            value = { props.inputvalue }
            onChange = { props.inputonchangeaction }
            {...props}
        />
    );
}