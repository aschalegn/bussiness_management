import React from 'react';

function LogedIn(props: any) {
    return (
        <section>
            {props.children}
        </section>
    );
}

export default LogedIn
