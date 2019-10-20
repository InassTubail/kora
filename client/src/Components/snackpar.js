import React from 'react';
import './snackpar.css'

function Snackbar(propss) {
    const { props } = propss;
    return props.open &&
        (props.type === 'cancelInvite' ||
            props.type === 'cancelPlayer' ||
            props.type === 'withdrawal' ||
            props.type === 'reject'
        ) ? (
            <div id="snackbar" className="show" >
                {props.type === 'cancelPlayer' && props.type === 'cancelInvite' && <p>
                    ثم استثناءك من اللعبة من قبل {props.come_from}
                </p>
                }
                {props.type === 'withdrawal' && <p>  {props.come_from}من اللعبه انسحب </p>}
                {props.type === 'reject' && <p>  {props.come_from} تم رفض الدعوة من قبل  </p>}

            </div>
        ) : null;
}
export default Snackbar;
