
interface FoundFilmI {
    id: number,
    original_title: string
}

const FoundFilms: React.FC<FoundFilmI> = ({id, original_title}) => {

    return (
        <div>
            <p>{id}</p>
            <p>{original_title}</p>
        </div>
    )
}

export default FoundFilms;