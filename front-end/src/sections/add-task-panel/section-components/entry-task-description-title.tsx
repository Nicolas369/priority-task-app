import { InputFieldComponent } from "../../../components/input-field-component";

export const EntryTaskDescriptionTitle = ({ onChangeTitle, onChangeDescription, responsibility, clearInputObservable}: any) => {

    return (
        <>
            <InputFieldComponent 
                label="Task Title"
                onChange={onChangeTitle} 
                colorResponsibility={responsibility}
                clearInputObservable={clearInputObservable}/> 
            <InputFieldComponent 
                isTextArea
                label="Task Description" 
                onChange={onChangeDescription} 
                colorResponsibility={responsibility}
                clearInputObservable={clearInputObservable}/> 
        </>
    )
}