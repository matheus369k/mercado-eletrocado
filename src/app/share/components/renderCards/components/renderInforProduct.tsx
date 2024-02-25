import { ProductsInfor } from "../../../../@types/types-interfaces"

export const renderInforProduct = (product: ProductsInfor) => {
    return (
        <ul className="infor-product">
          <li>
            <strong>Tela: </strong>
            {product.screen}
          </li>

          <li>
            <strong>Processador: </strong>
            {product.processor}
          </li>

          <li>
            <strong>Memoria: </strong>
            {product.memory}
          </li>

          {product.placeVideo ? (
            <li>
              <strong>Placa de video: </strong>
              {product.placeVideo}
            </li>
          ) : (
            <li>
              <strong>Bateria: </strong>
              {product.battery}
            </li>
          )}
        </ul>
    )
}
