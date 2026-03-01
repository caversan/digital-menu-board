import styled from 'styled-components';

export const BoardContainer = styled.div<{ $backgroundImage?: string }>`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* Background image com overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${({ $backgroundImage }) => 
      $backgroundImage ? `url(${$backgroundImage})` : 'none'};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.25;
    z-index: 0;
    transition: opacity 0.5s ease-in-out;
  }

  /* Overlay escuro para melhor contraste */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.background};
    opacity: 0.75;
    z-index: 0;
  }

  /* Todo conteúdo acima do background */
  > * {
    position: relative;
    z-index: 1;
  }
`;

export const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(to right, 
    #00880d 0%, #00880d 1%,
    #ffffff 1%, #ffffff 2%,
    #ac0000 2%, #ac0000 100%
  );
  padding-left: clamp(1rem, 4vw, 4rem);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  min-height: clamp(72px, 10vh, 112px);
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: 1024px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    padding-left: clamp(0.75rem, 3vw, 2rem);
    min-height: clamp(64px, 9vh, 88px);
  }

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
    min-height: 60px;
  }
`;

export const RestaurantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const RestaurantText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

export const RestaurantLogo = styled.img`
  width: clamp(40px, 6vw, 72px);
  height: clamp(40px, 6vw, 72px);
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(255, 255, 255, 0.12);
  padding: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const RestaurantName = styled.h1`
  font-size: clamp(1.1rem, 3vw, 2.6rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CategoryName = styled.h2`
  font-size: clamp(0.9rem, 2vw, 1.7rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MenuContent = styled.main`
  flex: 1;
  padding: clamp(0.75rem, 2.8vw, 2.5rem);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CategoryDescription = styled.p`
  font-size: clamp(0.85rem, 1.6vw, 1.35rem);
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: clamp(0.5rem, 1.8vw, 1.5rem);
  text-align: center;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (max-width: 768px) {
    -webkit-line-clamp: 1;
  }
`;

export const ContentLayout = styled.div`
  flex: 1;
  display: grid;
  gap: clamp(0.75rem, 1.8vw, 1.5rem);
  overflow: hidden;

  grid-template-columns: minmax(0, 1fr) minmax(360px, 46%);
  grid-template-rows: 1fr;

  @media (orientation: landscape) and (max-width: 1280px) {
    grid-template-columns: minmax(0, 1fr) minmax(300px, 42%);
  }

  @media (orientation: landscape) and (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(260px, 40%);
  }

  @media (orientation: portrait) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(240px, 44%) 1fr;
  }

  @media (orientation: portrait) and (max-width: 768px) {
    grid-template-rows: minmax(260px, 46%) 1fr;
  }

  @media (orientation: portrait) and (max-width: 480px) {
    grid-template-rows: minmax(260px, 48%) 1fr;
  }
`;

export const ItemsSection = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;

  @media (orientation: portrait) {
    order: 2;
    overflow: auto;
  }
`;

export const FeaturedSection = styled.div`
  overflow: hidden;
  display: flex;
  align-items: stretch;
  min-width: 0;

  @media (orientation: portrait) {
    order: 1;
  }
`;

export const ItemsGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: clamp(0.5rem, 1.6vw, 1.25rem);
  overflow: hidden;
  min-width: 0;

  @media (orientation: landscape) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  @media (orientation: portrait) {
    grid-template-columns: 1fr;
    overflow: visible;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const MenuItem = styled.div<{ $highlighted?: boolean; $hasImage?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: clamp(0.5rem, 1.4vw, 1rem);
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: grid;
  grid-template-columns: ${({ $hasImage }) => ($hasImage ? 'clamp(88px, 18vw, 150px) minmax(0, 1fr)' : '1fr')};
  gap: clamp(0.5rem, 1.2vw, 1rem);
  align-items: start;
  min-width: 0;
  min-height: clamp(112px, 18vh, 170px);
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};

  @media (max-width: 1024px) {
    grid-template-columns: ${({ $hasImage }) => ($hasImage ? '96px minmax(0, 1fr)' : '1fr')};
    min-height: 104px;
  }

  @media (max-width: 768px) {
    grid-template-columns: ${({ $hasImage }) => ($hasImage ? '82px minmax(0, 1fr)' : '1fr')};
    min-height: 96px;
  }

  @media (max-width: 480px) {
    grid-template-columns: ${({ $hasImage }) => ($hasImage ? '1fr' : '1fr')};
    min-height: unset;
  }
`;

export const ItemImage = styled.img`
  width: clamp(88px, 18vw, 150px);
  height: clamp(88px, 18vw, 150px);
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: 0;
  justify-self: start;
  display: block;

  @media (max-width: 1024px) {
    width: 96px;
    height: 96px;
  }

  @media (max-width: 768px) {
    width: 82px;
    height: 82px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 120px;
    justify-self: stretch;
  }
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 640px) {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const ItemName = styled.h3`
  font-size: clamp(0.9rem, 1.5vw, 1.4rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  flex: 1;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const ItemPrice = styled.span`
  font-size: clamp(0.9rem, 1.4vw, 1.2rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

export const ItemDescription = styled.p`
  font-size: clamp(0.78rem, 1.2vw, 1rem);
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media (min-width: 1201px) {
    -webkit-line-clamp: 3;
  }

  @media (max-width: 768px) {
    -webkit-line-clamp: 1;
  }
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
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: clamp(0.65rem, 1vw, 0.85rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

// ===== Featured Product Styles =====

export const FeaturedContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: clamp(0.75rem, 1.8vw, 1.5rem);
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}66`};
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1.2vw, 1rem);
  width: 100%;
  height: 100%;
  min-height: clamp(240px, 42vh, 460px);
  position: relative;
  overflow: hidden;

  /* Gradiente sutil de fundo */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.primary}05 0%, 
      transparent 50%
    );
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    flex-direction: row;
    align-items: stretch;
    min-height: 250px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 260px;
  }

  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

export const FeaturedLabel = styled.div`
  font-size: clamp(0.62rem, 0.8vw, 0.75rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary}20;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  align-self: flex-start;
  z-index: 1;

  @media (max-width: 1024px) {
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
  }
`;

export const FeaturedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  z-index: 1;
  justify-content: space-between;
  min-width: 0;

  @media (max-width: 1024px) {
    flex: 1;
    padding-right: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

export const FeaturedName = styled.h3`
  font-size: clamp(1.15rem, 2.2vw, 2rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  overflow-wrap: anywhere;

  @media (max-width: 1024px) {
    font-size: clamp(1.05rem, 2vw, 1.55rem);
    margin: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.sm} 0;
  }

  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`;

export const FeaturedDescription = styled.p`
  font-size: clamp(0.85rem, 1.35vw, 1.1rem);
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
  opacity: 0.9;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media (max-width: 1024px) {
    -webkit-line-clamp: 2;
  }

  @media (max-width: 480px) {
    -webkit-line-clamp: 1;
  }
`;

export const FeaturedPrice = styled.div`
  font-size: clamp(1.35rem, 2.8vw, 2.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: auto;

  @media (max-width: 1024px) {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

export const FeaturedBadgesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const FeaturedBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: clamp(0.65rem, 0.95vw, 0.85rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const FeaturedImageWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 1;
  aspect-ratio: 16 / 9;
  min-height: 220px;
  max-height: 420px;

  @media (max-width: 1024px) {
    width: 46%;
    min-height: 180px;
    max-height: 320px;
    aspect-ratio: 4 / 3;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: 165px;
    max-height: 260px;
    aspect-ratio: 16 / 10;
  }

  @media (max-width: 480px) {
    min-height: 150px;
    max-height: 220px;
  }
`;

export const FeaturedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;
