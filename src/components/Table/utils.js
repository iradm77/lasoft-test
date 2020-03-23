import React from 'react';
import Color from 'color';

export const buildCell = (value, background = '#fff') => {
	// Calculate background if not set for numeric values
	if (typeof value === "number") {
		switch (true) {
			case value < 5:
				background = Color('#e96377').lighten(value / 10).string(); // Lightnes percentage > 0 and < 0.5
				break;
			case value === 5: 
				background = '#fff';
				break;
			case value > 5:
				background = Color('#8cc8f5').lighten((10 - value) / 16); // Lightnes percentage > 0 and < 0.3125
		}
	}

	return {
        style: {
            backgroundColor: background,
        },
        value: typeof value === 'number'
            ? value === 0 ? value.toString() : value.toFixed(1)
            : value.toString(),
	};
};