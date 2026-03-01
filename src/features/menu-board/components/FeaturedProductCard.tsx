import React from 'react';
import type { MenuItem } from '../../../shared/types';
import {
  FeaturedContainer,
  FeaturedImageWrapper,
  FeaturedImage,
  FeaturedContent,
  FeaturedLabel,
  FeaturedName,
  FeaturedDescription,
  FeaturedPrice,
  FeaturedBadgesContainer,
  FeaturedBadge,
} from './MenuBoard.styles';

interface FeaturedProductCardProps {
  item: MenuItem;
}

const FeaturedProductCardComponent: React.FC<FeaturedProductCardProps> = ({ item }) => {
  return (
    <FeaturedContainer>
      <FeaturedLabel>Produto em Destaque</FeaturedLabel>
      
      <FeaturedContent>
        <div>
          <FeaturedName>{item.name}</FeaturedName>
          <FeaturedDescription>{item.description}</FeaturedDescription>
          
          {item.badges && item.badges.length > 0 && (
            <FeaturedBadgesContainer>
              {item.badges.map((badge, index) => (
                <FeaturedBadge key={index}>{badge}</FeaturedBadge>
              ))}
            </FeaturedBadgesContainer>
          )}
        </div>
        
        <FeaturedPrice>R$ {item.price.toFixed(2)}</FeaturedPrice>
      </FeaturedContent>
      
      {item.imageUrl && (
        <FeaturedImageWrapper>
          <FeaturedImage src={item.imageUrl} alt={item.name} />
        </FeaturedImageWrapper>
      )}
    </FeaturedContainer>
  );
};

export const FeaturedProductCard = React.memo(FeaturedProductCardComponent);
