import { useState } from 'react';

export default function RecipeScaler({ title, prepTime, cookTime, servings, ingredients }) {
  const [scale, setScale] = useState(1);
  const [originalServings] = useState(servings);

  // Function to format measurements nicely
  const formatQuantity = (quantity, unit) => {
    const scaledQty = quantity * scale;
    
    // Handle fractions for common measurements
    if (unit === 'cup' || unit === 'cups' || unit === 'tbsp' || unit === 'tsp') {
      if (scaledQty === 0.25) return '¼';
      if (scaledQty === 0.33 || scaledQty === 0.333) return '⅓';
      if (scaledQty === 0.5) return '½';
      if (scaledQty === 0.66 || scaledQty === 0.667) return '⅔';
      if (scaledQty === 0.75) return '¾';
    }
    
    // Round to 2 decimal places and remove trailing zeros
    return Number(scaledQty.toFixed(2)).toString();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-grey-100 rounded-md shadow-lg">
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div>
          <span className="font-medium">Prep Time:</span> {prepTime}
        </div>
        <div>
          <span className="font-medium">Cook Time:</span> {cookTime}
        </div>
        <div>
          <span className="font-medium">Servings:</span> {Math.round(originalServings * scale)}
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="scale-control" className="block text-sm font-medium text-gray-700 mb-1">
          Scale Recipe
        </label>
        <div className="flex items-center gap-4">
          <input
            id="scale-control"
            type="range"
            min="0.5"
            max="4"
            step="0.25"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-semibold bg-blue-100 px-2 py-1 rounded">
            {scale}x
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 pb-2 border-b-2 border-gray-200">Ingredients</h2>
        <ul className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-baseline">
              <span className="font-medium w-16">
                {formatQuantity(ingredient.quantity, ingredient.unit)}
              </span>
              <span className="w-20">{ingredient.unit}</span>
              <span>{ingredient.name}</span>
              {ingredient.notes && (
                <span className="ml-2 text-sm text-gray-500 italic">({ingredient.notes})</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Instructions are now rendered from MDX in the parent component */}
    </div>
  );
}