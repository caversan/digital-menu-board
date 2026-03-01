import React from 'react';
import type { MenuBoardSettings } from '../../../shared/types';
import {
  BoardContainer,
  Header,
  RestaurantInfo,
  RestaurantText,
  RestaurantLogo,
  RestaurantName,
  CategoryName,
  MenuContent,
  CategoryDescription,
  ItemsGrid,
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

interface MenuBoardProps {
  settings: MenuBoardSettings;
}

export const MenuBoard: React.FC<MenuBoardProps> = ({ settings }) => {
  const { menuData, layout, activeCategory } = settings;
  
  // Filtrar categoria ativa ou usar primeira categoria
  const currentCategory = activeCategory 
    ? menuData.categories.find(cat => cat.id === activeCategory)
    : menuData.categories[0];
  
  const categoryItems = menuData.items.filter(item => 
    item.categoryId === currentCategory?.id && item.isActive
  ).slice(0, layout.itemsPerPage); // Limitar itens por página

  return (
    <BoardContainer>
      <Header>
        <RestaurantInfo>
          {menuData.logoUrl && (
            <RestaurantLogo 
              src={menuData.logoUrl} 
              alt={`${menuData.name} logo`}
              onError={(e) => {
                console.error('❌ Erro ao carregar logo:', menuData.logoUrl);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('✅ Logo carregado com sucesso!');
              }}
            />
          )}
          <RestaurantText>
            <RestaurantName>{menuData.name}</RestaurantName>
            {currentCategory && (
              <CategoryName>{currentCategory.name}</CategoryName>
            )}
          </RestaurantText>
        </RestaurantInfo>
      </Header>

      <MenuContent>
        <CategoryDescription>
          {currentCategory?.description}
        </CategoryDescription>
        
        <ItemsGrid columns={layout.columns}>
          {categoryItems.map((item) => (
            <MenuItem
              key={item.id}
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
          ))}
        </ItemsGrid>
      </MenuContent>
    </BoardContainer>
  );
};

export default MenuBoard;