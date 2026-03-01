import styled from 'styled-components';

export const BoardContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  min-height: 96px;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (orientation: portrait) {
    min-height: 192px;
  }

  @media (orientation: landscape) {
    min-height: 144px;
  }
`;

export const RestaurantInfo = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (orientation: portrait) {
    align-items: stretch;
  }

  @media (orientation: landscape) {
    align-items: stretch;
  }
`;

export const RestaurantText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-width: 0;
`;

export const RestaurantLogo = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(255, 255, 255, 0.12);
  padding: ${({ theme }) => theme.spacing.sm};
  grid-column: 1;

  @media (orientation: portrait) {
    width: auto;
    height: 100%;
    max-height: calc(192px - (2 * ${({ theme }) => theme.spacing.md}));
    aspect-ratio: 1 / 1;
  }

  @media (orientation: landscape) {
    width: auto;
    height: 100%;
    max-height: calc(144px - (2 * ${({ theme }) => theme.spacing.md}));
    aspect-ratio: 1 / 1;
  }
`;

export const RestaurantName = styled.h1`
  font-size: 4rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1;
  display: flex;
  align-items: flex-end;
  height: 50%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const CategoryName = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
  margin: 0;
`;

export const MenuContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing['3xl']};
  overflow: hidden;
`;

export const CategoryDescription = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  text-align: center;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const ItemsGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: ${({ theme }) => theme.spacing['2xl']};
  overflow: hidden;

  @media (orientation: portrait) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const MenuItem = styled.div<{ $highlighted?: boolean; $hasImage?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: grid;
  grid-template-columns: ${({ $hasImage }) => ($hasImage ? '150px 1fr' : '1fr')};
  gap: ${({ theme }) => theme.spacing.md};
  align-items: stretch;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
`;

export const ItemImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: 0;
  justify-self: start;
`;

export const ItemContent = styled.div`
  flex: 1;
  flex-direction: column;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ItemName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  flex: 1;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

export const ItemPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

export const ItemDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const BadgesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: auto;
`;

export const Badge = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;
