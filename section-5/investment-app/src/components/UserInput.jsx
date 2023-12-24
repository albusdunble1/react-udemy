

export default function UserInput({info, onChangeInfo}) {

    // function handleOnChange(event, index){
    //     switch(index) {
    //         case 1:
    //             onChangeInfo(event.target.value, info.annual, info.expected, info.duration)
    //             break;
    //         case 2:
    //             onChangeInfo(info.initial, event.target.value, info.expected, info.duration)
    //             break;
    //         case 3:
    //             onChangeInfo(info.initial, info.annual, event.target.value, info.duration)
    //             break;
    //         case 4:
    //             onChangeInfo(info.initial, info.annual, info.expected, event.target.value)
    //             break;
    //       }
    // }

    return (
        
        <div id="user-input">
            <div className="input-group">
                <p>
                    <label htmlFor="initial">Initial Investment</label>
                    <input required type="number" name="initial" value={info.initial} onChange={(event) => onChangeInfo('initial', event.target.value)}/>
                </p>

                <p>
                    <label htmlFor="annual">Annual Investment</label>
                    <input required type="number" name="annual" value={info.annual} onChange={(event) => onChangeInfo('annual' , event.target.value)}/>
                </p>

            </div>
            <div className="input-group">
                <p>
                    <label htmlFor="expected">Expected Return</label>
                    <input required type="number" name="expected" value={info.expected} onChange={(event) => onChangeInfo('expected' , event.target.value)}/>
                </p>

               <p>
                    <label htmlFor="duration">Duration</label>
                    <input required type="number" name="duration" value={info.duration} onChange={(event) => onChangeInfo('duration' , event.target.value)}/>
               </p>
            </div>
        </div>
    )
}