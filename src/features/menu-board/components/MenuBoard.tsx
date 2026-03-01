import React, { useMemo, useCallback } from 'react';
import type { MenuBoardSettings } from '../../../shared/types';
import { MenuItemCard } from './MenuItemCard';
import { FeaturedProductCard } from './FeaturedProductCard';
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
  ContentLayout,
  ItemsSection,
  FeaturedSection,
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
  const allCategoryItems = useMemo(() => {
    return menuData.items
      .filter(item => item.categoryId === currentCategory?.id && item.isActive);
  }, [menuData.items, currentCategory?.id]);

  // Selecionar produto em destaque (primeiro com isHighlighted ou primeiro da lista)
  const featuredItem = useMemo(() => {
    const highlighted = allCategoryItems.find(item => item.isHighlighted);
    return highlighted || allCategoryItems[0];
  }, [allCategoryItems]);

  // Itens restantes (excluindo o produto em destaque)
  const regularItems = useMemo(() => {
    if (!featuredItem) return allCategoryItems.slice(0, layout.itemsPerPage);
    
    const filtered = allCategoryItems.filter(item => item.id !== featuredItem.id);
    return filtered.slice(0, layout.itemsPerPage - 1);
  }, [allCategoryItems, featuredItem, layout.itemsPerPage]);

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
        {currentCategory?.description && (
          <CategoryDescription>
            {currentCategory.description}
          </CategoryDescription>
        )}
        
        <ContentLayout>
          {/* Lista de Itens - ordem controlada por CSS */}
          <ItemsSection>
            <ItemsGrid columns={layout.columns}>
              {regularItems.map((item) => (
                <MenuItemCard key={item.id} item={item} layout={layout} />
              ))}
            </ItemsGrid>
          </ItemsSection>

          {/* Produto em Destaque - ordem controlada por CSS */}
          {featuredItem && (
            <FeaturedSection>
              <FeaturedProductCard item={featuredItem} />
            </FeaturedSection>
          )}
        </ContentLayout>
      </MenuContent>
    </BoardContainer>
  );
};

// Memoizar componente para evitar re-renders desnecessários
export const MenuBoard = React.memo(MenuBoardComponent);

export default MenuBoard;