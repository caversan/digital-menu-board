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
  padding: 2rem 3rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 140px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const RestaurantLogo = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  padding: 0.5rem;
`;

export const RestaurantName = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const CategoryName = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

export const DateTime = styled.div`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
  font-weight: 500;
`;

export const MenuContent = styled.main`
  flex: 1;
  padding: 3rem;
  overflow: hidden;
`;

export const CategoryDescription = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;
  text-align: center;
  line-height: 1.5;
`;

export const ItemsGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 2.5rem;
  height: calc(100% - 150px);
  overflow: hidden;
`;

export const MenuItem = styled.div<{ $highlighted?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const ItemName = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  flex: 1;
  line-height: 1.2;
`;

export const ItemPrice = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

export const ItemDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  margin: 0 0 1.5rem 0;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const BadgesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
`;

export const Badge = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
