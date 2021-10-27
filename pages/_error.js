import React from 'react'
import Layout from '../src/components/Layout/Layout';

function Error({ statusCode }) {
    return (
        <p>
            {statusCode}
        </p>
    )
}

Error.Layout = Layout;

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error