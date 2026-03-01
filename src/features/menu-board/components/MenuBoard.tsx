import React, { useMemo, useCallback } from 'react';
import type { MenuBoardSettings } from '../../../shared/types';
import { MenuItemCard } from './MenuItemCard';
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
} from './MenuBoard.styles';

interface MenuBoardProps {
  settings: MenuBoardSettings;
}

const MenuBoardComponent: React.FC<MenuBoardProps> = ({ settings }) => {
  const { menuData, layout, activeCategory } = settings;
  
  // Filtrar categoria ativa ou usar primeira categoria (memoizado)
  const currentCategory = useMemo(() => {
    return activeCategory 
      ? menuData.categories.find(cat => cat.id === activeCategory)
      : menuData.categories[0];
  }, [activeCategory, menuData.categories]);
  
  // Filtrar itens da categoria (memoizado)
  const categoryItems = useMemo(() => {
    return menuData.items
      .filter(item => item.categoryId === currentCategory?.id && item.isActive)
      .slice(0, layout.itemsPerPage);
  }, [menuData.items, currentCategory?.id, layout.itemsPerPage]);

  // Callbacks para handlers de imagem
  const handleLogoError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('❌ Erro ao carregar logo:', menuData.logoUrl);
    e.currentTarget.style.display = 'none';
  }, [menuData.logoUrl]);

  const handleLogoLoad = useCallback(() => {
    console.log('✅ Logo carregado com sucesso!');
  }, []);

  return (
    <BoardContainer>
      <Header>
        <RestaurantInfo>
          {menuData.logoUrl && (
            <RestaurantLogo 
              src={menuData.logoUrl} 
              alt={`${menuData.name} logo`}
              onError={handleLogoError}
              onLoad={handleLogoLoad}
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
            <MenuItemCard key={item.id} item={item} layout={layout} />
          ))}
        </ItemsGrid>
      </MenuContent>
    </BoardContainer>
  );
};

// Memoizar componente para evitar re-renders desnecessários
export const MenuBoard = React.memo(MenuBoardComponent);

export default MenuBoard;