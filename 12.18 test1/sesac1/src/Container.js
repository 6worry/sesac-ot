const Container = ({children}) => {
    return (
        <div style={{
            margin: 20,
            padding: 20,
            border: '1px solid green'
        }}>
            { children }
        </div>
    );
};

export default Container;