<script  context="module">
  import {RequiredItem, Controller} from '$lib/HoldownFinder/holdown';
  
  let resItem = new RequiredItem();
  export async function load({ page, fetch, session, context }){
    
    await resItem.initialize(fetch);  
    return resItem;
  }
</script>


<script>
  import {GetHttp} from '$lib/HoldownFinder/DataGetter'
  //let resItem1 = Object.assign({}, resItem);
  let resItem1 = resItem;
  let reportList = [];
  let imageScr = "";

  function buttonClick(item){
    if(resItem1.activeDict[item] == true){
      resItem1.activeDict[item] = false;
    }else{
      resItem1.activeDict[item] = true;
    }

    for(const key of Object.keys(resItem1.activeDict)){
      if(key != item){
        resItem1.activeDict[key] = false;
      }
    }
  }

  async function chosenItemClick(category, item){
    for(const key of Object.keys(resItem1.activeDict)){
      resItem1.activeDict[key] = false;
    }    

    resItem1.resultDict[category] = item;
    await checkClicked(null);
  }

  function blurClick(){
    for(const key of Object.keys(resItem1.activeDict)){
      resItem1.activeDict[key] = false;
    } 
  }

  function clickOutSite(event) {
    if (!(event.target.classList.contains('button') ||
          event.target.classList.contains('abc'))
       ){
      blurClick();
    }
  }

  async function checkClicked(event){
    
    reportList = await Controller.GetReceivedReport(resItem1.resultDict);
    imageScr = GetHttp.picDomain + resItem1.resultDict[RequiredItem.holdownstr] + ".png";
  }

//|preventDefault
</script>


<style>

  .hover_item:hover{
    background-color: rgb(206, 206, 206);
  }
</style>

<div class="section" on:click={clickOutSite}>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child">
        {#each Object.keys(resItem1.holdownDict) as category}
        <div class="columns is-mobile">
          <div class="column has-text-right is-multiline">
            <span class="is-size-5 is-size-6-mobile has-text-right">{category}</span>
          </div>
          <div class="column">
            <div class="dropdown" class:is-active={resItem1.activeDict[category]}>
              <div class="dropdown-trigger abc">
                <button class="button abc" aria-haspopup="true" aria-controls="dropdown-menu" on:click|preventDefault={() => buttonClick(category)} >
                      <span class="mr-2  abc">{resItem1.resultDict[category]}</span>
                      <span class="icon abc">
                        <i class="fas fa-angle-down abc"  aria-hidden="true"></i>
                      </span>
                </button>
              </div>
              <div class="dropdown-menu abc" id="dropdown-menu" role="menu">
                <div class="dropdown-content abc">
                  {#each resItem1.holdownDict[category] as item}
                  <p class="dropdown-item hover_item abc" on:click|preventDefault={() => chosenItemClick(category, item)}>
                    {item}
                  </p>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/each}

        <div class="field has-text-centered">
          <button class="button" on:click|preventDefault={() => checkClicked()}>Check</button>
        </div>
      </div>

      <div class="tile is-7-desktop is-6-tablet is-vertical is-parent">
        <div class="tile is-child">
          {#each reportList as line}
            <p class="has-text-6 has-text-left">{@html line}</p>
          {/each}
        </div>
        <div class="title is-child has-text-left-desktop has-text-centered-mobile">
            <img src="{imageScr}" alt="___" /> 
        </div>
        </div>
      </div>
    </div>
  </div>
</div>

