export default function Input(props){
    return(
        <input
            id = { props.inputId }
            name = { props.inputName }
            placeholder = { props.inputPlaceholder }
            value = { props.inputValue }
            onChange = { props.inputOnchangeAction }
            {...props}
        />
    );
}