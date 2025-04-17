// Initialize store interactions
document.addEventListener('DOMContentLoaded', () => {
  // Store card click handling
  document.querySelectorAll('.store-card').forEach(card => {
      card.addEventListener('click', (e) => {
          // Prevent button click from triggering card click
          if(!e.target.closest('.view-store-btn')) {
              const storeId = card.dataset.storeId;
              window.location.href = `shop-details.html?id=${storeId}`;
          }
      });
  });

  // Filter functionality
  document.querySelectorAll('.category-tag').forEach(tag => {
      tag.addEventListener('click', () => {
          document.querySelector('.category-tag.active').classList.remove('active');
          tag.classList.add('active');
          // Add filter logic here
      });
  });
});