<!-- Preview.svelte -->
<script>
    export let dashboardData;
    export let onShowMore;
</script>
  
<style>
    .preview-panel {
      flex: 1;
      padding: 0;
      overflow-y: auto;
      background-color: white;
      position: relative;
    }
    
    .preview-header {
      background-color: var(--dark-bg);
      color: white;
      padding: 1rem;
    }
    
    .preview-section {
      padding: 1rem;
      text-align: center;
    }
    
    .section-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      position: relative;
    }
    
    .section-title::after {
      content: '';
      display: block;
      width: 120px;
      height: 4px;
      background-color: var(--primary-color);
      margin: 0.5rem auto;
    }
    
    .button-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 1rem 0;
    }
    
    .app-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      text-decoration: none;
      color: var(--text-color);
    }
    
    .button-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .button-text {
      font-size: 0.9rem;
    }
    
    .bottom-nav {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      position: absolute;
      bottom: 0;
      width: 100%;
      height: auto;
      background-color: white;
      border-top: 1px solid var(--border-color);
      padding: 0.5rem 0;
    }
    
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: var(--text-color);
      font-size: 0.8rem;
      width: 100%;
    }
    
    .nav-icon {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }
    
    .spacer {
      height: 70px;
    }
</style>
  
<div class="preview-panel">
    <div class="preview-header">
      <div id="preview-home">Home</div>
    </div>
    
    {#each dashboardData.sections as section}
      <div class="preview-section">
        <div class="section-title">{section.title}</div>
        <div class="button-grid">
          {#each section.buttons as button}
            <a href={button.link} class="app-button">
              {#if button.icon.startsWith('http')}
                <div class="button-icon">
                  <img src={button.icon} alt={button.text} style="width: 2rem; height: 2rem;" />
                </div>
              {:else}
                <div class="button-icon" style="color: {button.color}">
                  {button.icon}
                </div>
              {/if}
              <div class="button-text">{button.text}</div>
            </a>
          {/each}
        </div>
      </div>
    {/each}
    
    <div class="spacer"></div>
    
    <div class="bottom-nav">
        {#each dashboardData.bottomNav as navItem}
            <a href={navItem.link} class="nav-item">
                {#if navItem.icon.startsWith('http')}
                    <div class="nav-icon">
                        <img src={navItem.icon} alt={navItem.text} style="width: 1.5rem; height: 1.5rem;" />
                    </div>
                {:else}
                    <div class="nav-icon" style="color: {navItem.active ? navItem.color : '#888'}">
                        {navItem.icon}
                    </div>
                {/if}
                <div style="color: {navItem.active ? navItem.color : '#888'}">
                    {navItem.text}
                </div>
            </a>
        {/each}

        <a href="#more" class="nav-item" on:click={() => { onShowMore(); }}>
          <div class="nav-icon" style="color: #888;">•••</div>
          <div style="color: #888;">More</div>
        </a>
    </div>
</div>