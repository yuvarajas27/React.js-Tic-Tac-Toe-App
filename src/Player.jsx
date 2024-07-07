// importing the useState hook from react
import { useState } from "react"


// exporting the Player component function as default, this is one of the way to export default function, we can export only one default function in a component
export default function Player({ initialPlayerName, playerSymbol, isActive, onChangeName }) {


    // defining the playerName state variable as initialPlayerName as initial value by passing as an argument to useState Hook and we can use setPlayeName state updating function to update the playerName state variable. 

    // we are managing this state to update the playerName whenever any text change occurs in input box for every keystroke
    const [playerName, setPlayerName] = useState(initialPlayerName)


    // defining the isEditing state variable as false as initial value by passing as an argument to useState Hook and we can use setIsEditing state updating function to update the isEditing state variable. 

    // we are managing this state to update the isEditing value, we are toggling the value that means if user clicks the edit button(initially "Edit" button will be seen in UI, IsEditing value is false), now, IsEditing value will be true and "Edit" button will be changed to "Save", Then if user clicks the "Save" button again, now IsEditing value will be changed to false again.
    const [isEditing, setIsEditing] = useState(false)

    function handleClick() {
        setIsEditing((editing) => !isEditing)

        if (isEditing) {
            onChangeName(playerSymbol, playerName)
        }


    }

    function handleChange(event) {
        setPlayerName(event.target.value)

    }
    return (
        //   
        <>
            <li className={isActive ? "active" : undefined}>
                <span className="player">
                    {!isEditing ? <span className="player-name">{playerName}</span> : <input type="text" onChange={handleChange} value={playerName} />}


                    <span className="player-symbol">{playerSymbol}</span>
                </span>
                <button onClick={handleClick}>{!isEditing ? "Edit" : "Save"}</button>
            </li>
        </>
    )
}

