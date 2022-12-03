import React from 'react'

export default function Total(props) {

    const { totalPrice } = props;

    return (
        <div>

            <h2 className='position-relative start-100 border-bottom border-danger ps-2' style={{ width: 200 }}>Total: <span>{totalPrice}</span></h2>

        </div>
    )
}
