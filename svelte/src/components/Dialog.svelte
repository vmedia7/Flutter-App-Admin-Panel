<script>
    import ButtonEditor from "./ButtonEditor.svelte";
    import { createEventDispatcher } from "svelte";

    export let data;

    const dispatch = createEventDispatcher();

    const onClose = () => { dispatch('close') };

    function generateNewButtonId() {
		return 'btn' + Math.random().toString(36).slice(2, 6); // 4 random chars
	}

    function createNewButton() {
        const outdata = {
            id: generateNewButtonId(),
            icon: "⭐",
            text: "New More Button",
            link: "#"
        }

        dispatch('create', outdata);
    }
</script>
  
<div class="overlay">
    <div class="dialog">
        <div class="dialog-header">
            <h2>More settings</h2>
            <button class="close-button" on:click={onClose}>&times;</button>
        </div>

        <div class="container">
            <div class="content-container">
                <button class="btn" on:click={() => {createNewButton()}}>Add New Button</button>
                {#each data as button}
                    <ButtonEditor buttonData={{...button, isNavItem: false}} showColor={false} on:update on:delete />
                {/each}
            </div>
        
            <div class="content-container preview-container">
                {#each data as content}
                    <span class="nav-item">
                        {#if (content.icon.startsWith("http") || content.icon.startsWith("/"))}
                            <img class="nav-icon" src={content.icon} alt={content.text}>
                        {:else}
                            <span class="nav-icon">{content.icon}</span>
                        {/if}
        
                        <span style="color: #888;">{content.text}</span>
                    </span>
                {/each}
            </div>
        </div>
    </div>
</div>
  
<style>
    .btn {
	  background-color: var(--primary-color);
	  color: white;
	  border: none;
	  padding: 0.5rem 1rem;
	  border-radius: 4px;
	  cursor: pointer;
	  margin: 1.5rem 0.5rem;
	}

    .container {
        height: auto;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin: 10px 0;
    }

    .content-container {
        width: 48.5%;
        height: auto;
        padding: 20px;
    }

    .preview-container {
        display: flex;
        gap: 7px;
        flex-wrap: wrap;
    }

    .nav-item {
        margin-bottom: 1.5;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        font-size: 0.8rem;
    }

    .nav-icon {
        font-size: 1.5rem;
        margin-bottom: 0.25rem;
    }

    .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 1rem;
    }
  
    .dialog {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        /* max-width: 400px; */
        width: 100%;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        overflow-y: auto;
        max-height: 90vh;
    }
  
    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
  
    .dialog-header h2 {
        margin: 0;
        font-size: 1.25rem;
    }
  
    .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
        width: 40px;
        height: 40px;
    }

    .close-button:hover {
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
        transition: .05s;
    }
  
    @media (max-width: 480px) {
      .dialog {
        padding: 1rem;
      }
  
      .dialog-header h2 {
        font-size: 1rem;
      }
    }

    @media (max-width: 780px) {
      .content-container {
        width: 100%;
      }
    }
</style>
