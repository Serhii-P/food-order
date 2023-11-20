
const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img src="/pizza.png" className="max-h-auto max-h-24 block mx-auto" alt="pizza"/>
      </div>
      <h4 className="font-semibold text-xl my-3">Pepperoni pizza</h4>
      <p className="text-gray-500 text-sm line-clamp-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </p>
      {/* <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      /> */}
    </div>
  )
}

export default MenuItem