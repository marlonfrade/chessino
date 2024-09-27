import React from "react";

const MoveHistory = ({ moves }) => {
  return (
    <div className="move-history bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Move History</h3>
      <div className="grid grid-cols-2 gap-2">
        {moves.map((move, index) => (
          <div key={index} className="text-sm">
            {index % 2 === 0 ? `${Math.floor(index / 2) + 1}.` : ""} {move}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveHistory;
