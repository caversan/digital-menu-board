import React from 'react';
import type { MenuItem as MenuItemType, LayoutConfig } from '../../../shared/types';
import {
  MenuItem,
  ItemImage,
  ItemContent,
  ItemHeader,
  ItemName,
  ItemPrice,
  ItemDescription,
  BadgesContainer,
  Badge,
} from './MenuBoard.styles';

interface MenuItemCardProps {
  item: MenuItemType;
  layout: LayoutConfig;
}

const MenuItemCardComponent: React.FC<MenuItemCardProps> = ({ item, layout }) => {
  return (
    <MenuItem
      $highlighted={item.isHighlighted}
      $hasImage={layout.showImages && !!item.imageUrl}
    >
      {layout.showImages && item.imageUrl && (
        <ItemImage src={item.imageUrl} alt={item.name} />
      )}
      <ItemContent>
        <ItemHeader>
          <ItemName>{item.name}</ItemName>
          {layout.showPrices && (
            <ItemPrice>R$ {item.price.toFixed(2)}</ItemPrice>
          )}
        </ItemHeader>
        {layout.showDescriptions && item.description && (
          <ItemDescription>{item.description}</ItemDescription>
        )}
        {item.badges && item.badges.length > 0 && (
          <BadgesContainer>
            {item.badges.map((badge, index) => (
              <Badge key={index}>{badge}</Badge>
            ))}
          </BadgesContainer>
        )}
      </ItemContent>
    </MenuItem>
  );
};

// Memoizar para evitar re-render de itens que não mudaram
export const MenuItemCard = React.memo(MenuItemCardComponent);
