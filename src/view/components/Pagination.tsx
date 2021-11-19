import GardenerPlant from "../../domain/entities/GardenerPlant";
import Plant, { IPlant } from "../../domain/entities/Plant";

const Pagination = ({currentPage, itemsPerPage, length, onPageChange }) => {

    const pageCount: number = Math.ceil(length / itemsPerPage);
    const pages: number[] = []
    for (let i = 1; i <= pageCount; i++ ){
        pages.push(i);
    }

    return (
        <nav className="d-flex justify-content-center py-4">
            <ul className="pagination success">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
                </li>
                {pages.map(page => {
                    return <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                        <button className="page-link" onClick={() =>onPageChange(page)}>{page}</button>
                    </li>}
                )}
                
                <li className={`page-item ${currentPage === pageCount ? "disabled" : ""}`}>
                {/* <a className="page-link" href="#">&raquo;</a> */}
                <button className="page-link" onClick={() =>onPageChange(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </nav>
    )

}


// on retourne un tableau qui correspond à une portion définie de notre tableau passé en paramètre
Pagination.getData = (items:IPlant[], currentPage: number, itemsPerPage: number): IPlant[] => {

    const start: number = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage)
}



export default Pagination;