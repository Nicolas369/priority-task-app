import { InputFieldComponent } from "../../../components/input-field-component";
import { EntryTaskDescriptionTitleInterface } from "../../../definitions/sections-definitions";

export const EntryTaskDescriptionTitle = (props: EntryTaskDescriptionTitleInterface) => {
    const { onChangeTitle, onChangeDescription, responsibility, clearInputObservable } = props;
    
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
