import React, { Component } from 'react'
import { StoreContext } from '..'

function ProductDetails(props) {

  const { setCurrentProduct } = props.store.getState();
  const { currentProduct } = setCurrentProduct;
  console.log("CURRENT PRODUCT:", setCurrentProduct["title"]);
  return (
    <>
      {/* <div>ProductDetails Page</div> */}
      <div className='container p-5'>

        <div className="border border-secondary border-1 rounded-2 d-flex  p-2" style={{ width: "auto" }}>
          <img src={currentProduct.img} className="card-img-top w-25" alt="..." />

          <div className='d-inline w-auto h-auto'>

            <h5 className="ps-3" style={{ width: "auto" }}>{currentProduct.title}</h5>
            <p className="ps-3" style={{ width: "auto" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste temporibus velit a amet officiis soluta rerum est blanditiis labore, eaque repellendus praesentium veritatis aspernatur. Praesentium soluta debitis quo consequatur ab! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam perferendis delectus tenetur iure consequatur explicabo, nisi nihil, facilis culpa in vero perspiciatis deleniti tempore accusamus nostrum impedit necessitatibus iste blanditiis.
            </p>

          </div>
        </div>
      </div>
    </>

  )
}




class ProductDetailsWapper extends Component {

  render() {
    return (
      <StoreContext.Consumer>
        {
          (store => <ProductDetails store={store} />)
        }
      </StoreContext.Consumer>
    )
  }
}

export default ProductDetailsWapper;