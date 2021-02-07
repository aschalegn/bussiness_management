import React from 'react';

function LogedIn(props: Props) {
    return (
        <section>
            {props.children}
        </section>
    );
}

export default LogedIn
