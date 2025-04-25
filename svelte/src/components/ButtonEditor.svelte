<!-- ButtonEditor.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    
    export let buttonData;
    
    const dispatch = createEventDispatcher();
    
    let isOpen = false;
    
    function toggleAccordion() {
      isOpen = !isOpen;
    }
    
    function updateButton() {
      const data = {
        id: buttonData.id,
        icon: buttonData.icon,
        text: buttonData.text,
        color: buttonData.color,
        link: buttonData.link,
        isNavItem: buttonData.isNavItem
      };
      
      if (buttonData.isNavItem) {
        data.active = buttonData.active;
      }
      
      dispatch('update', data);
    }
    
    function deleteButton() {
      dispatch('delete', {
        id: buttonData.id,
        isNavItem: buttonData.isNavItem
      });
    }
</script>
  
<style>
    .button-editor {
      border: 1px solid var(--border-color);
      padding: 0;
      margin-bottom: 1rem;
      border-radius: 4px;
    }
    
    .accordion {
      background-color: #f1f1f1;
      color: #444;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      text-align: left;
      border: none;
      outline: none;
      transition: 0.4s;
      margin-top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .accordion::after {
      content: '\02795';
      font-size: 13px;
    }
    
    .accordion.active::after {
      content: "\2796";
    }
    
    .panel {
      padding: 0 18px;
      background-color: white;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
    }
    
    .panel.open {
      padding: 18px;
      max-height: 500px;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }
    
    .button-container {
      display: flex;
      gap: 0.5rem;
    }
    
    button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button.delete {
      background-color: #ff3b30;
    }
    
    .color-preview {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-left: 10px;
      vertical-align: middle;
    }
</style>
  
<div class="button-editor">
    <button class="accordion {isOpen ? 'active' : ''}" on:click={toggleAccordion}>
      {buttonData.isNavItem ? 'Nav Item' : 'Button'}: {buttonData.text}
      <span class="color-preview" style="background-color:{buttonData.color}"></span>
    </button>
    
    <div class="panel {isOpen ? 'open' : ''}">
        <div class="form-group">
            <label for="icon-{buttonData.id}">Icon:</label>
            <input type="text" id="icon-{buttonData.id}" bind:value={buttonData.icon} placeholder="Enter icon or URL" />
        </div>
      
        <div class="form-group">
            <label for="text-{buttonData.id}">Text:</label>
            <input type="text" id="text-{buttonData.id}" bind:value={buttonData.text} placeholder="Enter button text" />
        </div>
      
        <div class="form-group">
            <label for="color-{buttonData.id}">Color:</label>
            <input type="color" id="color-{buttonData.id}" bind:value={buttonData.color} />
        </div>
      
        <div class="form-group">
            <label for="link-{buttonData.id}">Link:</label>
            <input type="text" id="link-{buttonData.id}" bind:value={buttonData.link} placeholder="Enter link URL" />
        </div>
      
        {#if buttonData.isNavItem}
            <div class="form-group">
            <label for="active-{buttonData.id}">Active:</label>
            <input type="checkbox" id="active-{buttonData.id}" bind:checked={buttonData.active} />
            </div>
        {/if}
      
        <div class="button-container">
            <button on:click={updateButton}>Update</button>
            <button class="delete" on:click={deleteButton}>Delete</button>
        </div>
    </div>
</div>